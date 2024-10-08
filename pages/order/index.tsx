import React from "react";
import {Listbox, ListboxItem, Chip, ScrollShadow, Avatar} from "@nextui-org/react";
import {users} from "./data.js";
import DefaultLayout from "@/layouts/default";
import { PageEnum } from "@enum/";

export default function ListFood() {
  const [values, setValues] = React.useState(new Set(["1"]));

  const arrayValues = Array.from(values);

  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {arrayValues.map((value) => (
          <Chip key={value}>{users.find((user) => `${user.id}` === `${value}`)?.name}</Chip>
        ))}
      </ScrollShadow>
    );
  }, [arrayValues.length]);

  return (
    <DefaultLayout title={PageEnum.FoodSelect} props={{keys:Array.from(values)}}>

      <Listbox
        topContent={topContent}
        classNames={{
          // base: "max-w-xs",
          base: "max-w-[800px]",
          // list: "max-h-[800px] overflow-scroll",
        }}
        defaultSelectedKeys={["1"]}
        items={users}
        label="Assigned to"
        selectionMode="multiple"
        onSelectionChange={(keys) => setValues(keys as Set<string>)}
        variant="flat"
      >
        {(item) => (
          <ListboxItem key={item.id} textValue={item.name}>
            <div className="flex gap-2 items-center">
              <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
              <div className="flex flex-col">
                <span className="text-small">{item.name}</span>
                <span className="text-tiny text-default-400">{item.email}</span>
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
      </DefaultLayout>
  );
}
