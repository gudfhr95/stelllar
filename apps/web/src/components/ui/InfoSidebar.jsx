import Sidebar from "@/components/ui/sidebar/Sidebar";
import ctl from "@netlify/classnames-template-literals";
import { useCopyToClipboard } from "react-use";

const linkClass = ctl(`
  cursor-pointer
  hover:underline
`)

const btcAddress = import.meta.env.VITE_BTC_ADDRESS
const ethAddress = import.meta.env.VITE_ETH_ADDRESS

export default function InfoSidebar() {
  const copyToClipboard = useCopyToClipboard()[1]

  return (
    <Sidebar right>
      <div className="px-2.5 py-2.5 flex flex-col">
        <div className="mt-auto" />
      </div>
    </Sidebar>
  )
}
