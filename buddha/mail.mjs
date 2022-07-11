import fetch from "node-fetch";

export async function sendMail(subject, html) {
    const mail = await fetch('https://api.mailgun.net/v3/sandbox0b19bd1dd4f54354927b99b3771b7061.mailgun.org/messages', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + btoa('api:key-30216dcdf3a2de794dabfd3acf999c96')},
        body: new URLSearchParams({
            from: 'Kiitos Coinbase <kiitos@heartbank.exchange>',
            to: 'heartbank@att.net',
            subject,
            html
        })
    });
    
    //console.log(subject);
    return mail.json();
}