import { tokens } from "@/main";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "./button";
import { TokenIcon } from "./icons";
import { Input } from "./input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export default function Receive({
  receive,
  setReceive,
}: {
  receive: string;
  setReceive: (token: string) => void;
}) {
  return (
    <div className="bg-background-float flex w-full justify-between gap-16 rounded-lg p-3">
      <div className="flex flex-col gap-3">
        <span className="fint-inter text-foreground-dimmed text-xs">You receive</span>
        <Input className="h-10 w-24 p-1.5 text-2xl" value="0" />
        <span className="fint-inter text-foreground-dimmed text-xs">0 Balance</span>
      </div>
      <div className="flex flex-col items-end justify-end gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="flex items-center gap-2">
              <TokenIcon token={receive} />
              {receive}
              <ChevronDownIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {tokens.map((token) => {
              return (
                <DropdownMenuItem onClick={() => setReceive(token.currency)}>
                  <div className="flex items-center gap-1.5">
                    <TokenIcon token={token.currency} />
                    <span>{token.currency}</span>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="fint-inter text-foreground-dimmed text-xs">Moonbeam</span>
      </div>
    </div>
  );
}
