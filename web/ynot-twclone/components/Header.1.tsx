import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { HeaderProps } from "./Header";

export const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
	const router = useRouter();

	const handleBack = useCallback(() => {
		router.back();
	}, [router]);
	return (
		<div className="border-b-[1px] border-neutral-800.p-5">
			<div className="flex flex-row items-center gap-2">
				{showBackArrow && <BiArrowback onClick={handleBack} color />}
			</div>
		</div>
	);
};
