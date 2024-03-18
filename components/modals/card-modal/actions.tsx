"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";

interface ActionsProps{
    data: CardWithList,
}
export const Actions = ({
    data
}: ActionsProps) =>{
	return (
		<div className="space-y-2 mt-2">
			<p className="text-xs font-semibold">
				Actions
			</p>
		</div>
	);
}

Actions.Skeleton = function ActionsSkeleton () {
	return (
		<div className="space-y-2 mt-2">
			<Skeleton className="w-20 h-4 bg-neutral-200" />
			<Skeleton className="w-full h-8 bg-neutral-200" />
			<Skeleton className="w-full h-8 bg-neutral-200" />
		</div>
	);
}