import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Router } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./MakingProject.css";
import RichTextEditor from "tools/RichTextEditor";

const MakingProject = () => {
	const [project, setProject] = useState(null);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [summary, setSummary] = useState("");
	const [imageSrc, setImageSrc] = useState("");
	const [videoSrc, setVideoSrc] = useState("");
	const [isTempSave, setIsTempSave] = useState(false);
	const [fundingSettings, setFundingSettings] = useState([
		{ fundname: "", funddetail: "", fundfee: "" },
	  ]);
	const navigate = useNavigate();
	const { projectId } = useParams();

	useEffect(() => {
		const fetchProject = async () => {
			const projectRef = doc(firestore, "projects", projectId);
			const projectDoc = await getDoc(projectRef);

			if (projectDoc.exists()) {
				setProject(projectDoc.data());
				setTitle(projectDoc.data().title);
				setContent(projectDoc.data().content);
				setSummary(projectDoc.data().summary);
				setImageSrc(projectDoc.data().imageSrc);
				setVideoSrc(projectDoc.data().videoSrc);
				setFundingSettings(projectDoc.data().fundingSettings);
			} else {
				console.error("Project not found");
			}
		};

		fetchProject();
	}, [projectId]);

	const saveProject = async (isTemp) => {
		try {
			const projectRef = doc(firestore, "projects", projectId);
			await updateDoc(projectRef, {
				title,
				content,
				summary,
				imageSrc,
				videoSrc,
				isTempSave: isTemp,
				fundingSettings
			});
			alert("업로드 되었습니다!");
			navigate(`/projects`);

		} catch (error) {
			console.error("Error updating project: ", error);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (title && content && summary && imageSrc && videoSrc) {
			await saveProject(true);
		} else {
			alert("모든 내용을 다 채워야 합니다!!!");
		}
	};

	const handleTempSave = async () => {
		await saveProject(false);
	};

	const handleAddFundingSetting = () => {
		setFundingSettings([
		  ...fundingSettings,
		  { fundname: "", funddetail: "", fundfee: "" },
		]);
	  };
	
	  const handleRemoveFundingSetting = () => {
		if (fundingSettings.length > 1) {
		  setFundingSettings(fundingSettings.slice(0, -1));
		}
	  };
	
	  const handleFundingSettingChange = (index, key, value) => {
		const newFundingSettings = [...fundingSettings];
		newFundingSettings[index][key] = value;
		setFundingSettings(newFundingSettings);
	  };

	const handleImageUpload = async (event) => {
		const file = event.target.files[0];
		const fileRef = ref(storage, `images/${file.name}`);
		const uploadTask = uploadBytesResumable(fileRef, file);
	
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Optional: You can display the upload progress here
			},
			(error) => {
				console.error("Error uploading image: ", error);
			},
			async () => {
				const imageURL = await getDownloadURL(fileRef);
				setImageSrc(imageURL);
			}
		);
	};
	
	const handleVideoUpload = async (event) => {
		const file = event.target.files[0];
		const fileRef = ref(storage, `videos/${file.name}`);
		const uploadTask = uploadBytesResumable(fileRef, file);
	
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Optional: You can display the upload progress here
			},
			(error) => {
				console.error("Error uploading video: ", error);
			},
			async () => {
				const videoURL = await getDownloadURL(fileRef);
				setVideoSrc(videoURL);
			}
		);
	};

	const autoresize = (event) => {
		const target = event.target;
		target.style.height = "auto";
		target.style.height = target.scrollHeight + "px";
	};

	if (!project) {
		return <div id="loading">프로젝트를 불러오고 있습니다.....</div>;
	}

	return (
		<div>
			<br/><br/><br/>
			<h1>프로젝트 수정하기</h1>
			<form onSubmit={handleSubmit}>
				{/* Form fields */}
				<p>
					제목<br/>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						id="inputs"
						placeholder="Enter project title"
					/>
				</p>
				<p>
					요약문<br/>
					<input
						type="text"
						value={summary}
						onChange={(e) => setSummary(e.target.value)}
						id="inputs"
						placeholder="Enter project summary"
					/>
				</p>		
				<p>
					내용<br/>
					<RichTextEditor value={content} onChange={(value) => setContent(value)} />

				</p>     
				<p>
					펀딩 설정
					{fundingSettings.map((setting, index) => (
					<div key={index} style={{ display: "flex", marginBottom: "10px" }}>
						<input
						type="text"
						value={setting.fundname}
						onChange={(e) =>
							handleFundingSettingChange(index, "fundname", e.target.value)
						}
						placeholder="Fund name"
						style={{ marginRight: "10px", flex: 3}}
						/>
						<input
						type="text"
						value={setting.funddetail}
						onChange={(e) =>
							handleFundingSettingChange(index, "funddetail", e.target.value)
						}
						placeholder="Fund detail"
						style={{ marginRight: "10px", flex: 7 }}
						/>
						<input
						type="number"
						value={setting.fundfee}
						onChange={(e) =>
							handleFundingSettingChange(index, "fundfee", e.target.value)
						}
						placeholder="Fund fee"
						style={{ flex: 2 }}
						min="0"
						/>
					</div>
					))}
				</p>
				<button type="button" onClick={handleAddFundingSetting}>추가</button>
				<button type="button" onClick={handleRemoveFundingSetting}>삭제</button>
				<br/><br/>
				<p> 
					이미지 업로드<br/>
					<input type="text" class="file_input_textbox" readOnly="" value={imageSrc}/>
					<input
						type="file"
						accept="image/*"
						onChange={handleImageUpload}
					/>
				</p>
				<p>
					영상 업로드 (15초 이내)<br/>
					<input type="text" class="file_input_textbox" readOnly="" value={videoSrc}/>
					<input
						type="file"
						accept="video/*"
						onChange={handleVideoUpload}
					/>
				</p>
				
				<button type="button" onClick={handleTempSave}>
					임시 저장
				</button>
				<button type="submit">프로젝트 업로드 및 수정</button>
			</form>
		</div>
	);
};

export default MakingProject;
