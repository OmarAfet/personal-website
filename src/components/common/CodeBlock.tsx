"use client";

import Copy from "@/icons/Copy";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "next-themes";

type Props = {
	name: string;
	lang?: string;
	children: Readonly<React.ReactNode>;
};

export default function CodeBlock({ name, lang, children }: Props) {
	const [isCopied, setIsCopied] = useState(false);
	const { theme } = useTheme();

	function handleCopyCode() {
		navigator.clipboard.writeText(children?.toString() ?? "");
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 1000);
	}

	return (
		<div className="flex flex-col border rounded-md mt-6">
			<div className="text-muted-foreground border-b flex justify-between px-4 py-2 items-center">
				<div>{name}</div>
				<Button onClick={handleCopyCode} variant="ghost" size="icon" className="h-8 w-8 relative">
					<Copy
						className={clsx("animate absolute", {
							"scale-0 opacity-0": isCopied,
							"scale-1": !isCopied,
						})}
					/>
					<CheckIcon
						className={clsx("animate absolute p-1", {
							"scale-0 opacity-0": !isCopied,
						})}
					/>
				</Button>
			</div>
			<SyntaxHighlighter CodeTag={"div"} showLineNumbers language={lang} style={theme == "dark" ? atomOneDark : atomOneLight} customStyle={{ margin: "0", padding: "1rem", backgroundColor: "transparent" }}>
				{children?.toString() || ""}
			</SyntaxHighlighter>
		</div>
	);
}
