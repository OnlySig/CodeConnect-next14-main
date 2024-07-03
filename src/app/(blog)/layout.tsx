import Aside from "@/components/Aside";
import InputSearch from "@/components/InputSeach";
import { ReactNode } from "react";

export default function BlogLayout({ children } : {children: ReactNode}) {
    return (
        <div className='app-container'>
          <div className="">
            <Aside/>
          </div>
          <div className="main-content">
            <InputSearch/>
            {children}
          </div>
        </div>
    )
}