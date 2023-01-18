import { expect, it } from "vitest";
import { Person } from "./person";

it("should say Hello", () => {
  const person = new Person();
  const sayHello = "Hello, World!";
  expect(person.sayHello()).toBe(sayHello);
});
