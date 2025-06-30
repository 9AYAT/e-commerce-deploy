import nodemailer from 'nodemailer'
export const sendEmail=async({to,subject,html})=>{
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"ayatabdelrhman514@gmail.com",
        //pass:"wsju cviy qexx vvvf"
        pass:"xovf krwy oupx zhxh"
    }
})
await transporter.sendMail({
    to,
    from:"'<e-commerce-hti>'ayatabdelrhman514@gmail.com",
    subject,
    html
})
}