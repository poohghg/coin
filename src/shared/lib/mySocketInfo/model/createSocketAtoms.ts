import { Country } from "@/shared/model/market";
import { createMessage, createSocketAtom } from "lib/socket";
import { UpdatePriority } from "lib/socket/model/socketTypes";

export interface SocketAtomPriority {
  priority?: UpdatePriority;
}

export type SocketMessageType = "INFO" | "RATE" | "PRICE" | "NEW_TRADE";

interface BaseResponseMessage {
  responseAt: number;
}

interface InfoResponse extends BaseResponseMessage {
  type: "INFO";
  country: Country;
  rate: number;
}

interface RateResponse extends BaseResponseMessage {
  type: "RATE";
  rate: number;
}

interface PriceResponse extends BaseResponseMessage {
  type: "PRICE";
  country: Country;
  name: string;
  price: number;
}

interface NewTradeResponse extends BaseResponseMessage {
  type: "NEW_TRADE";
  country: Country;
  name: string;
  amount: number;
}

type ResponseTypeMap = {
  INFO: InfoResponse;
  RATE: RateResponse;
  PRICE: PriceResponse;
  NEW_TRADE: NewTradeResponse;
};

type KeyCreator<T extends any[]> = (...args: T) => string;

interface SocketKeyMap {
  INFO: KeyCreator<[Country]>;
  RATE: KeyCreator<[]>;
  PRICE: KeyCreator<[Country, string]>;
  NEW_TRADE: KeyCreator<[]>;
}

export const createSocketKeyMap: SocketKeyMap = {
  INFO: (country) => `INFO/${country}`,
  RATE: () => `RATE`,
  PRICE: (country, name) => `PRICE/${country}/${name}`,
  NEW_TRADE: () => `NEW_TRADE`,
};

const createMsg = <K extends keyof ResponseTypeMap>(
  type: K,
  key: string,
  params: Partial<Omit<ResponseTypeMap[K], "type">> = {},
) => {
  return createMessage(type, key, {
    command: "SUBSCRIBE",
    ...params,
  });
};

export const createSocketAtoms = {
  INFO(country: Country, priority?: UpdatePriority) {
    const key = createSocketKeyMap.INFO(country);
    const message = createMsg("INFO", key, { country });

    return createSocketAtom<ResponseTypeMap["INFO"], typeof message>(
      key,
      message,
      priority,
    );
  },

  RATE(priority?: UpdatePriority) {
    const key = createSocketKeyMap.RATE();
    const message = createMsg("RATE", key);

    return createSocketAtom<ResponseTypeMap["RATE"], typeof message>(
      key,
      message,
      priority,
    );
  },

  PRICE(country: Country, name: string, priority?: UpdatePriority) {
    const key = createSocketKeyMap.PRICE(country, name);
    const message = createMsg("PRICE", key, { country, name });

    return createSocketAtom<ResponseTypeMap["PRICE"], typeof message>(
      key,
      message,
      priority,
    );
  },

  NEW_TRADE(priority?: UpdatePriority) {
    const key = createSocketKeyMap.NEW_TRADE();
    const message = createMsg("NEW_TRADE", key);

    return createSocketAtom<ResponseTypeMap["NEW_TRADE"], typeof message>(
      key,
      message,
      priority,
    );
  },
};
