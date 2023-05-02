import React from "react";
import { localUserData } from "./Account";

const Projects = () => {
    if(localUserData() == null){
        return (
            <div>
                <span>로그인 이후에 사용 할 수 있는 기능입니다.</span>
            </div>
        );
    }
    else{
        return (
            <div></div>
        );
    }
    
};

export default Projects;