import "@testing-library/jest-dom";
import { afterEach } from "node:test";
import { afterAll, beforeAll } from "vitest";
import { server } from "./mocks/node";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
