import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { addresses } from "@/main";
import Identicon from "@polkadot/react-identicon";
import { SendDialogContent, SwapDialogContent } from "./dialog-content";
import {
  PolkadotCircle,
  AcalaCircle,
  HydraCircle,
  EthereumCircle,
  AddIcon,
} from "./icons";

function ItemContent({
  children,
  label,
  disabled,
}: {
  children?: JSX.Element;
  label?: String;
  disabled?: boolean;
}) {
  return (
    <DropdownMenuItem disabled={disabled}>
      <div className="flex items-center gap-2 pointer-none">
        {children}
        <span>{label}</span>
      </div>
    </DropdownMenuItem>
  );
}

export default function DropdownMenuLocal({
  children,
  token,
}: {
  children?: JSX.Element;
  token?: String;
}) {
  const [currentAddress, setCurrentAddress] = useState(0);
  const [currentModal, setCurrentModal] = useState("send");

  return (
    <DropdownMenu>
      <Dialog>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Teleport to</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <ItemContent label="Assets Hub" disabled>
                <PolkadotCircle />
              </ItemContent>
              <DropdownMenuSeparator />
              <ItemContent label="Polkadot Relay Chain" disabled>
                <PolkadotCircle />
              </ItemContent>
              <ItemContent label="Acala" disabled>
                <AcalaCircle />
              </ItemContent>
              <ItemContent label="HydraDX" disabled>
                <HydraCircle />
              </ItemContent>
              <DropdownMenuSeparator />
              <ItemContent label="Ethereum (through bridge)" disabled>
                <EthereumCircle />
              </ItemContent>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Send to Address</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-48">
              {addresses.map((address, index) => (
                <>
                  <DialogTrigger
                    className="w-full"
                    onClick={() => {
                      setCurrentAddress(index);
                      setCurrentModal("send");
                    }}
                  >
                    <ItemContent
                      label={
                        address.name
                          ? address.name
                          : `${address?.ss58.slice(0, 4)}...
                            ${address?.ss58.slice(
                              address.ss58.length - 4,
                              address.ss58.length
                            )}`
                      }
                    >
                      <Identicon
                        value={address.ss58}
                        theme="polkadot"
                        size={24}
                      />
                    </ItemContent>
                  </DialogTrigger>
                  {address.name && <DropdownMenuSeparator />}
                </>
              ))}
              <DialogTrigger className="w-full">
                <ItemContent label="New Address">
                  <AddIcon />
                </ItemContent>
              </DialogTrigger>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DialogTrigger
            className="w-full"
            onClick={() => {
              setCurrentModal("swap");
            }}
          >
            <DropdownMenuItem>Swap</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem disabled>Stake</DropdownMenuItem>
          <DropdownMenuItem disabled>Delegate</DropdownMenuItem>
          <DropdownMenuItem disabled>Inspect on Explorer</DropdownMenuItem>
        </DropdownMenuContent>
        <DialogContent className="gap-6">
          {currentModal === "send" ? (
            <SendDialogContent
              address={addresses[currentAddress]}
              token={token}
            />
          ) : (
            <SwapDialogContent token={token} />
          )}
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
}
