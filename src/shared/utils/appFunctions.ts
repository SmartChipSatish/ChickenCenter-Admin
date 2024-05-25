import { ApiUrl } from "../../ApiUrl/apiUrl"


export const fileUpload = (photo: any) => {
    return new Promise((resolve, reject) => {
        const data = new FormData()
        data.append('file', photo)
        data.append('upload_preset', 'cgvymfjn')
        data.append("cloud_name", "dnhbdmhp6")
        fetch(`${ApiUrl.FILEUPLOADURL}`, {
            method: "POST",
            body: data
        }).then(res => res.json()).
            then(data => {
                resolve(data.secure_url)
            }).catch(err => {
                reject("An Error Occured While Uploading")
            })
    })
}