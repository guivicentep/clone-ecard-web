import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdArrowBack } from "react-icons/md";
import type { StudentData } from "../types";
import "./EditForm.css";

interface Props {
	initial: StudentData;
	onSave: (data: StudentData) => void;
	onCancel: () => void;
}

export function EditForm({ initial, onSave, onCancel }: Props) {
	const [form, setForm] = useState<StudentData>(initial);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		const file = acceptedFiles[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (e) => {
			setForm((prev) => ({ ...prev, photoUrl: e.target?.result as string }));
		};
		reader.readAsDataURL(file);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { "image/*": [] },
		multiple: false,
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	return (
		<div className="edit-container">
			<div className="edit-header">
				<button type="button" className="back-btn" onClick={onCancel}>
					<MdArrowBack size={24} />
				</button>
				<span className="edit-title">Editar Carteirinha</span>
			</div>

			<div className="edit-content">
				{/* Preview da foto + dropzone */}
				<div
					{...getRootProps()}
					className={`dropzone ${isDragActive ? "active" : ""}`}
				>
					<input {...getInputProps()} />
					<img src={form.photoUrl} alt="Foto atual" className="photo-preview" />
					<p className="dropzone-hint">Toque para trocar a foto</p>
				</div>

				<div className="field">
					<label htmlFor="name">Nome</label>
					<input
						id="name"
						name="name"
						type="text"
						value={form.name}
						onChange={handleChange}
					/>
				</div>

				<div className="field">
					<label htmlFor="studentId">Número USP</label>
					<input
						id="studentId"
						name="studentId"
						type="text"
						value={form.studentId}
						onChange={handleChange}
					/>
				</div>

				<div className="field">
					<label htmlFor="course">Instituto / Curso</label>
					<input
						id="course"
						name="course"
						type="text"
						value={form.course}
						onChange={handleChange}
					/>
				</div>

				<button type="button" className="save-btn" onClick={() => onSave(form)}>
					Salvar
				</button>
			</div>
		</div>
	);
}
