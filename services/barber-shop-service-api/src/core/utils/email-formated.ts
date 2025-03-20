import { EmailFormatIncorretly } from "../../domain/errors/email-format-incorretly"

export function formatEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!emailRegex.test(email)) {
      throw new EmailFormatIncorretly()
    }
    return email    
  }
  