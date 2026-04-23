import axios from "axios"

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (email: IEmail) => {
    try {
      const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: "RomboTask",
            email: "jordirofu@gmail.com",
          },
          to: [{ email: email.email }],
          subject: "RomboTask - Confirma tu cuenta",
          htmlContent: `
            <p>Hola ${email.name}, has creado tu cuenta en RomboTask, ya casi está todo listo.</p>
            <p>
              Visita el siguiente enlace 
              <a href="${process.env.FRONTEND_URL}/auth/confirm-account">
                (confirmar cuenta)
              </a> 
              e introduce el código <b>${email.token}</b>
            </p>
            <p>Este token expira en 10 minutos</p>
          `,
        },
        {
          headers: {
            "api-key": process.env.BREVO_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("EMAIL CONFIRMACIÓN ENVIADO:", response.data.messageId);

    } catch (error: any) {
      console.error("Error enviando email de confirmación:", error.response?.data || error.message);
      throw new Error("Error al enviar email de confirmación");
    }
  };

  static sendResetPasswordEmail = async (email: IEmail) => {
    try {
      const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: "RomboTask",
            email: "jordirofu@gmail.com",
          },
          to: [{ email: email.email }],
          subject: "RomboTask - Restablece tu contraseña",
          htmlContent: `
            <p>Hola ${email.name}, has solicitado restablecer tu contraseña.</p>
            <p>
              Visita el siguiente enlace 
              <a href="${process.env.FRONTEND_URL}/auth/new-password">
                (restablecer contraseña)
              </a> 
              e introduce el código <b>${email.token}</b>
            </p>
            <p>Este token expira en 10 minutos</p>
          `,
        },
        {
          headers: {
            "api-key": process.env.BREVO_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("EMAIL RESET ENVIADO:", response.data.messageId);

    } catch (error: any) {
      console.error("Error enviando email de reset:", error.response?.data || error.message);
      throw new Error("Error al enviar email de recuperación");
    }
  };
}