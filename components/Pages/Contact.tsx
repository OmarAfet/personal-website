"use client";

import ToastError from "@components/ToastError";
import sendContact from "@libs/sendContact";
import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";

export default function Contact() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [lock, setLock] = useState(false);

	const COOLDOWN_DURATION = 10000;

	useEffect(() => {
		const lastSubmissionTime = localStorage.getItem("lastSubmissionTime");
		if (lastSubmissionTime) {
			const timeSinceLastSubmission = Date.now() - Number(lastSubmissionTime);
			if (timeSinceLastSubmission < COOLDOWN_DURATION) {
				setLock(true);
				const remainingCooldown = COOLDOWN_DURATION - timeSinceLastSubmission;
				setTimeout(() => {
					setLock(false);
				}, remainingCooldown);
			}
		}
	}, []);

	const sendContactForm = async (e: FormEvent) => {
		e.preventDefault();
		const lastSubmissionTime = localStorage.getItem("lastSubmissionTime");
		const timeSinceLastSubmission = Date.now() - Number(lastSubmissionTime);
		const remainingCooldown = Math.round((COOLDOWN_DURATION - timeSinceLastSubmission) / 1000);
		if (lock) return ToastError(`Please wait ${remainingCooldown} seconds before sending another message`);

		await sendContact(title, description);

		setLock(true);
		localStorage.setItem("lastSubmissionTime", String(Date.now()));

		setTimeout(() => {
			setLock(false);
		}, COOLDOWN_DURATION);
	};

	return (
		<div className="flex flex-col gap-16 md:mx-[20%]">
			<div id="Contact" className="center header scroll-mt-12">
				Contact
			</div>
			<form onSubmit={(e) => sendContactForm(e)} className="flex flex-col gap-8">
				<motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="duration-0">
					<input onChange={(e) => setTitle(e.target.value)} className="w-full" type="text" placeholder="Title" />
				</motion.div>
				<motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="duration-0">
					<textarea onChange={(e) => setDescription(e.target.value)} className="w-full" rows={5} placeholder="Description" />
				</motion.div>
				<motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="duration-0 flex">
					<button className="btn-0 flex-1" type="submit">
						Submit
					</button>
				</motion.div>
			</form>
		</div>
	);
}
