import { useState } from "react";
import { FaBarcode } from "react-icons/fa";
import { MdEdit, MdQrCode2 } from "react-icons/md";
import { EditForm } from "./components/EditForm";
import { useStudentData } from "./hooks/useStudentData";
import type { StudentData } from "./types";
import "./App.css";

function App() {
	const [showBarcode, setShowBarcode] = useState<boolean>(false);
	const [editing, setEditing] = useState<boolean>(false);
	const { data, save } = useStudentData();

	function handleSave(newData: StudentData) {
		save(newData);
		setEditing(false);
	}

	if (editing) {
		return (
			<EditForm
				initial={data}
				onSave={handleSave}
				onCancel={() => setEditing(false)}
			/>
		);
	}

	return (
		<div className="container">
			{/* Header */}
			<div className="header">
				<span className="ecard-title">e-Card</span>
				<div className="header-icons">
					<button
          type="button"
						className="icon-btn"
						onClick={() => setShowBarcode(!showBarcode)}
					>
						{showBarcode ? <MdQrCode2 size={24} /> : <FaBarcode size={24} />}
					</button>
					<button type="button" className="icon-btn" onClick={() => setEditing(true)}>
						<MdEdit size={24} />
					</button>
				</div>
			</div>

			{/* Main */}
			<div className="main-content">
				<div className="logo-container">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Webysther_20160310_-_Logo_USP.svg/200px-Webysther_20160310_-_Logo_USP.svg.png"
						alt="USP Logo"
						className="usp-logo"
					/>
					<p className="university-name">Universidade de São Paulo</p>
				</div>

				<p className="student-type">ALUNO</p>

				<div className="photo-container">
					<img
						src={data.photoUrl}
						alt="Foto do aluno"
						className="student-photo"
					/>
				</div>

				<div className="student-info">
					<p className="student-name">{data.name}</p>
					<p className="student-id">{data.studentId}</p>
					<p className="institute">{data.course}</p>
					<p className="degree">GRADUAÇÃO</p>
				</div>

				<div className="qr-container">
					<div className="qr-box">
						<img
							src={showBarcode ? "/barcode.png" : "/qr-code.png"}
							alt="Código"
							className={showBarcode ? "barcode-image" : "qr-image"}
						/>
					</div>
				</div>

				<p className="expiration-text">
					{showBarcode
						? "Validade\n01/2030"
						: "Código QR expira em 03/07/2025 23:59"}
				</p>
			</div>
		</div>
	);
}

export default App;
