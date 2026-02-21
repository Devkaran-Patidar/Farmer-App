import "./ContactForm.css"
import axios from "axios";
export default function ContactForm(){
      async  function handleContact(e) {
            e.preventDefault();
            let data = {
                name : e.target.name.value,
                email : e.target.email.value,
                subject: e.target.subject.value,
                message: e.target.msg.value   
               };
              console.log(data)
             await axios.post("http://127.0.0.1:8000/api/contactapp/contact/",data)
               .then(response =>{
                alert("Message Send Successfully !");
                console.log(response.data)
                 e.target.reset();
               })
               .catch(error =>{
                console.error("error sending data : ", error);
               });
        }  
    return (
      <>
      
<section className="contact-section">

           <div className="contact-form">
            <h2>Send Message</h2>

            <form onSubmit={handleContact}>
                <input type="text" placeholder="Your Name" name="name" required/>
                <input type="email" placeholder="Your Email" name="email" required/>
                <input type="text" placeholder="Subject" name="subject" required/>
                <textarea rows="5" placeholder="Your Message" name="msg" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>


</section>
</>
    );
}