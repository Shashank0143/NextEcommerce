"use client"

import Image from "next/image";

const UserAvatarImgComponent = (props) => {
    
    return (
        <div className={`userImg ${props.lg===true && 'lg'}`}>
    
            <span className="rounded-circle">{
                props.img!==undefined  && props.img.length!==0 ?   <Image src={props.img} alt="user" height={""} width={""}  /> : 


                <span>{props?.userName!=="" && props?.userName?.charAt(0)}</span>
            }
               
            </span>
        </div>
    )
}

export default UserAvatarImgComponent;