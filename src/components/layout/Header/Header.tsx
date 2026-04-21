import cosyIcon from "../../../assets/cosy-logo.webp";

const Header = () => {
    return <div className={"w-full h-[70px] flex p-2 justify-between align-center px-4"}>
        <div id={"left-side"} className={"flex gap-3"}>
            <img src={cosyIcon} alt={"Cosy Icon"} className={"h-[90%]"}/>
            <div>
                <div className={"text-[23px]"}>Cosy Domain Provider</div>
                <div className={"text-[18px]"}>Fetch your own Subdomains</div>
            </div>
        </div>
        <div id={"right-side"}>

        </div>
    </div>
}

export default Header;