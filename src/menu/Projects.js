import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, query, where, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { localUserData } from "./Personal";
import { useNavigate } from "react-router-dom";
import "./Projects.css";
import DeleteIcon from '@mui/icons-material/Delete';

  
const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [newProjectTitle, setNewProjectTitle] = useState("");
    const navigate = useNavigate();
    const [hoverProjectId, setHoverProjectId] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const userData = localStorage.getItem("firebase:authUser:");
            const userId = JSON.parse(userData).email;
            const projectQuery = query(
                collection(firestore, "projects"),
                where("createdBy", "==", userId)
            );
            const projectData = await getDocs(projectQuery);
            setProjects(projectData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        fetchProjects();
    }, []);

    const handleNewProjectSubmit = async (event) => {
        event.preventDefault();
    
        if (!newProjectTitle) {
          alert("프로젝트 이름을 설정해주세요!");
          return;
        }
    
        const userData = localStorage.getItem("firebase:authUser:");
        const userId = JSON.parse(userData).email;
    
        try {
          const newProjectRef = await addDoc(collection(firestore, "projects"), {
            title: newProjectTitle,
            createdBy: userId,
            summary: "",
            imageSrc: "",
            videoSrc: "",
            content: "",
            isTempSave: false,
            linked: "",
            fundingSettings: [] 
          });
          const projectId = newProjectRef.id;
          await updateDoc(newProjectRef, { linked: projectId });

          setNewProjectTitle("");
          alert("프로젝트가 생성 되었습니다.");
          navigate(`/Projects/${newProjectRef.id}`);
        } catch (error) {
          console.error("Error creating project: ", error);
        }
      };

    const handleProjectClick = (projectId) => {
        navigate(`/Projects/${projectId}`);
    };

    const handleDeleteClick = async (projectId) => {
        if(window.confirm("프로젝트를 삭제 하시겠습니까?")){
            try {
                await deleteDoc(doc(firestore, "projects", projectId));
                setProjects(projects.filter((project) => project.id !== projectId));
                alert("삭제 되었습니다");
              } catch (error) {
                console.error("Error deleting project: ", error);
              }
            }
        };
        if(localUserData() == null){
            return (
                <div id="isLogin">
                    로그인 이후에 사용 할 수 있는 기능입니다.
                </div>
            );
    }
    else{     
        return (         
            <div className="container">
                <ul>
                    <br/>
                    <h2 className="explain">프로젝트 리스트</h2>
                    <li>
                        <form onSubmit={handleNewProjectSubmit}>
                        <input
                            type="text"
                            value={newProjectTitle}
                            onChange={(e) => setNewProjectTitle(e.target.value)}
                            placeholder="새로 생성 할 프로젝트의 이름을 적어주세요"
                        />
                        <button type="submit">프로젝트 추가</button>
                        </form>

                    </li>
                    <h2 className="explain">진행 중인 프로젝트</h2>


                    {projects.map((project) => (
                        <li
                            key={project.id}
                            onClick={() => handleProjectClick(project.id)}
                            style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            padding: "10px",
                            border: "1px solid #ccc",
                            marginBottom: "10px",
                            position: "relative", // 삭제 아이콘을 포함하기 위해 상대 위치를 설정합니다.
                            }}
                            onMouseEnter={() => setHoverProjectId(project.id)}
                            onMouseLeave={() => setHoverProjectId(null)}
                        >
                            <img src={project.imageSrc} alt={project.title} width="100" height="100" />
                            <div style={{ marginLeft: "10px" }}>
                            <h3>{project.title}</h3>
                            <p>{project.summary}</p>
                            </div>
                            <DeleteIcon
                            src={DeleteIcon}
                            alt="delete"
                            onClick={(e) => {e.stopPropagation(); handleDeleteClick(project.id)}}
                            style={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                                width: "3rem",
                                height: "3rem",
                                cursor: "pointer",
                                display: hoverProjectId === project.id ? "block" : "none", // hover 상태에 따라 삭제 아이콘을 표시하거나 숨깁니다.
                            }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default Projects;
