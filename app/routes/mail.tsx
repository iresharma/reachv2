import Mail from "~/components/mail/components/mail"
import { accounts, mails } from "~/components/mail/data"

export default function MailPage() {
    const layout = false
    const collapsed = false

    const defaultLayout = layout ? JSON.parse(layout.value) : undefined
    const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

    return (
        <>
            <div className="hidden flex-col md:flex h-[90vh]">
                <Mail
                    accounts={accounts}
                    mails={mails}
                    defaultLayout={defaultLayout}
                    defaultCollapsed={defaultCollapsed}
                    navCollapsedSize={3}
                />
            </div>
        </>
    )
}
