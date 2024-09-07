import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
interface CounterProps {
  callback: (value: number) => void;
}
export default function Counter({ callback }: CounterProps) {
  const [count, setCount] = useState(0);


  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    callback(newCount); // เรียก callback เมื่อมีการเปลี่ยนแปลงค่า count
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    callback(newCount); // เรียก callback เมื่อมีการเปลี่ยนแปลงค่า count
  };

  const handleChange = (event: React.ChangeEventHandler<HTMLInputElement> | any) => {
    const value = Number(event.target.value);
    if (value >= 0 && value <= 99) {
      setCount(value);
      callback(value);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button className="text-2xl" onClick={decrement}>
        -
      </Button>
      <Input
        onChange={handleChange}
        value={count.toString()}
        className="text-center flex items-center"
        size="lg"
        style={{ width: `3ch`, textAlign: 'center', display: 'flex', alignItems: 'center' }}
      />
      <Button className="text-2xl" onClick={increment}>
        +
      </Button>
    </div>
  );
}
