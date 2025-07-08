const a={supportTicket:e=>({subject:`Support Ticket #${e.id} - ${e.userData.name}`,body:`
New support ticket created:

Ticket ID: ${e.id}
User: ${e.userData.name}
Email: ${e.userData.email}
Order ID: ${e.userData.orderId||"N/A"}
Issue: ${e.userData.issue||"General inquiry"}
Priority: ${e.priority}
Created: ${e.createdAt.toLocaleString()}

Chat History:
${e.chatHistory.map(r=>`[${r.sender.toUpperCase()}] ${r.text}`).join(`
`)}

Please respond within 1 hour.
    `,htmlBody:`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Support Ticket #${e.id}</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Ticket Details</h3>
          <p><strong>User:</strong> ${e.userData.name}</p>
          <p><strong>Email:</strong> ${e.userData.email}</p>
          <p><strong>Order ID:</strong> ${e.userData.orderId||"N/A"}</p>
          <p><strong>Issue:</strong> ${e.userData.issue||"General inquiry"}</p>
          <p><strong>Priority:</strong> <span style="color: ${i(e.priority)};">${e.priority.toUpperCase()}</span></p>
          <p><strong>Created:</strong> ${e.createdAt.toLocaleString()}</p>
        </div>
        
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Chat History</h3>
          ${e.chatHistory.map(r=>`
            <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 4px;">
              <strong style="color: ${r.sender==="user"?"#2563eb":"#059669"};">
                ${r.sender==="user"?"👤 User":"🤖 AI Assistant"}
              </strong>
              <p style="margin: 5px 0 0 0;">${r.text}</p>
              <small style="color: #64748b;">${new Date(r.timestamp).toLocaleString()}</small>
            </div>
          `).join("")}
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e;">
            <strong>⚠️ Action Required:</strong> Please respond to the user within 1 hour.
          </p>
        </div>
        
        <p style="color: #64748b; font-size: 14px;">
          This ticket was automatically generated from the AI chat system.
        </p>
      </div>
    `}),userConfirmation:e=>({subject:`Support Ticket #${e.id} Received - CelebrationShare`,body:`
Dear ${e.userData.name},

Thank you for contacting CelebrationShare support. We have received your inquiry and our team will get back to you within 1 hour.

Ticket Details:
- Ticket ID: ${e.id}
- Issue: ${e.userData.issue||"General inquiry"}
- Priority: ${e.priority}

If you have any additional information to share, please reply to this email.

Best regards,
The CelebrationShare Support Team
    `,htmlBody:`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">CelebrationShare</h1>
          <p style="color: #64748b; margin: 5px 0;">Your Neighborhood Party Rental Community</p>
        </div>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #0369a1; margin-top: 0;">Support Ticket Received</h2>
          <p>Dear ${e.userData.name},</p>
          <p>Thank you for contacting CelebrationShare support. We have received your inquiry and our team will get back to you within <strong>1 hour</strong>.</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Ticket Details</h3>
          <p><strong>Ticket ID:</strong> ${e.id}</p>
          <p><strong>Issue:</strong> ${e.userData.issue||"General inquiry"}</p>
          <p><strong>Priority:</strong> ${e.priority}</p>
          <p><strong>Created:</strong> ${e.createdAt.toLocaleString()}</p>
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e;">
            <strong>💡 Tip:</strong> If you have any additional information to share, please reply to this email.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; margin: 0;">
            Best regards,<br>
            <strong>The CelebrationShare Support Team</strong>
          </p>
        </div>
      </div>
    `})},i=e=>{switch(e){case"urgent":return"#dc2626";case"high":return"#ea580c";case"normal":return"#2563eb";case"low":return"#059669";default:return"#64748b"}},d=async(e,r,t)=>{const o={id:`TICKET_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,sessionId:e,userData:r,chatHistory:t,createdAt:new Date,priority:n(r.issue||""),status:"open",notes:[]};return await s(o),await p(o),o},n=e=>{const r=e.toLowerCase();return r.includes("urgent")||r.includes("emergency")||r.includes("broken")?"urgent":r.includes("payment")||r.includes("refund")||r.includes("dispute")?"high":r.includes("technical")||r.includes("login")||r.includes("error")?"normal":"low"},s=async e=>{const r=a.supportTicket(e);console.log("Sending support ticket email:",{to:"support@celebration-share.com",subject:r.subject,body:r.body}),await new Promise(t=>setTimeout(t,1e3))},p=async e=>{const r=a.userConfirmation(e);console.log("Sending user confirmation email:",{to:e.userData.email,subject:r.subject,body:r.body}),await new Promise(t=>setTimeout(t,1e3))};export{d as createSupportTicket};
