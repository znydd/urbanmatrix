"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import { useEffect, useState } from "react"
import { getAllReq } from "@/utils/adminApi"
import { downloadAnyDocs } from "@/utils/adminApi"
import { createBithCertificate, createDeathCertificate, createNid } from "@/utils/adminApi"
import { removeReq } from "@/utils/adminApi"
import { pushNotification } from "@/utils/notificationApi"


interface Doc {
    doc_type: string;
    req_id: string;
    status: string;
    file_path: string;
    name: string;
    father: string;
    mother: string;
    email: string | null;
    dob: string | null;
    dod: string | null;
    birth_cert_no: string | number | null;
    address: string;
}




export default function RegistrationVerification(){

    const [docs, setDocs] = useState<Doc[]>([])

    useEffect(() => {
        fetchAllDocs()
    }, [])
    const fetchAllDocs = async () => {
        try {
            const data = await getAllReq()
            setDocs(data)
            console.log(data)

        } catch (error) {
            console.error(error)
        }
    } 

    const handleFileDownload = async (file_path: string) => {
        try {
            const url = await downloadAnyDocs(file_path)
            if (typeof url !== 'string') {
                console.error('Download URL is undefined or not a string');
                return;
            }
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${file_path.split("/")[2]}.png`);
            document.body.appendChild(link);
            link.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            link.remove();

        } catch (error) {
            
        }
    }

    const handleApprove = async (doc: Doc) => {
        if(doc.doc_type === "Birth Certificate"){
            const resp = await createBithCertificate(doc.name, doc.father, doc.mother, doc.dob, doc.address)
            const birth_cert_no = resp.birth_cert_no
            if(resp){
                fetchAllDocs()
                const resp = await pushNotification(`Your Birth Certificate created with ${birth_cert_no}`)
                const removeResp = await removeReq(doc.req_id, doc.doc_type)
            }
        }else if(doc.doc_type === "NID"){
                fetchAllDocs()
                const resp = await createNid(doc.name, doc.father, doc.mother, doc.email, doc.dob, doc.birth_cert_no, doc.address)
                const nid_no = resp.nid_no
                if(resp){
                    const resp = await pushNotification(`Your NID created with ${doc.email} and ${nid_no}`)
                    const removeResp = await removeReq(doc.req_id, doc.doc_type)
                }
        }else{
                const resp = await createDeathCertificate(doc.name, doc.father, doc.mother, doc.dod, doc.birth_cert_no, doc.address)
                const death_cert_no = resp.death_cert_no
                if(resp){
                    fetchAllDocs()
                    const resp = await pushNotification(`Your Death Certificate created with ${death_cert_no}`)
                    const removeResp = await removeReq(doc.req_id, doc.doc_type)
                }
        }

    }
    
    const handleDecline = async (req_id: string, doc_type: string) => {        
                const removeResp = await removeReq(req_id, doc_type)
                console.log(removeResp)
                if(removeResp){
                    const resp = await pushNotification(`Your ${doc_type} request rejected!`)
                }
        }

    return(
        <>
        <Card className=' w-full p-4'>
            <Card >
                      <CardHeader>
                          <CardTitle className="text-lg">Request</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                          {docs.map((doc, index) => (
                              <div
                                  key={index}
                                  className={`flex justify-between items-center p-2 rounded-md ${doc.doc_type === "Death Certificate" ? "bg-yellow-100" : doc.doc_type === "Birth Certificate"? "bg-green-100" : "bg-blue-200"
                                      }`}
                              >
                                  <div>
                                      <p className="font-medium">{doc.doc_type}</p>
                                      <p className="text-sm text-gray-600">Name: {doc.name}</p>
                                      <p className="text-sm text-gray-600">Father: {doc.father}</p>
                                      <p className="text-sm text-gray-600">Mother: {doc.mother}</p>
                                      <p className={`text-sm text-gray-600 ${doc.doc_type === "Death Certificate" ? "" : "hidden"}`}>Date of Death: {doc.dod}</p>
                                      <p className={`text-sm text-gray-600 ${doc.doc_type === "Death Certificate" ? "hidden" : ""}`}>Date of Birth: {doc.dob}</p>
                                      <p className={`text-sm text-gray-600 ${doc.doc_type === "NID" ? "" : "hidden"}`}>Email: {doc.email}</p>
                                      <p className={`text-sm text-gray-600 ${doc.doc_type === "Birth Certificate" ? "hidden" : ""}`}>Birth Certificate No: {doc.birth_cert_no}</p>
                                      <p className="text-sm text-gray-600">Address: {doc.address}</p>
                                      <div className=" flex flex-row mt-2 gap-2">
                                      <p className=" font-semibold text-sm">Download submitted docs</p>
                                      <FileDown size={18} onClick={() => handleFileDownload(doc.file_path)}/>
                                      </div>

                                  </div>
                                  <div>
                                  <Button onClick={() => handleApprove(doc)} className=" mr-2 bg-green-500" variant="outline" size="sm">
                                    Approve
                                  </Button>
                                  <Button onClick={() => handleDecline(doc.req_id, doc.doc_type)} className=" bg-red-500"variant="outline" size="sm">
                                      Decline
                                  </Button>
                                  </div>
                              </div>
                                  
                          ))}
                      </CardContent>
      </Card>
      </Card>

        </>
    )

}
