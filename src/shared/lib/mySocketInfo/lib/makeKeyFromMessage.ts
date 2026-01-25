import {
  createSocketKeyMap,
  SocketMessageType,
} from "lib/mySocketInfo/model/createSocketAtoms";

export const handleMakeKeyFromMessage = (data: any) => {
  const type = data.type as SocketMessageType;

  if (!type) {
    return null;
  }

  if (!createSocketKeyMap[type]) {
    return null;
  }

  switch (type) {
    case "RATE":
      return createSocketKeyMap[type]();
    case "INFO":
      if (data.country) {
        return createSocketKeyMap[type](data.country);
      }
      break;
    case "PRICE":
    case "NEW_TRADE":
      if (data.country && data.name) {
        return createSocketKeyMap[type](data.country, data.name);
      }
      break;
  }

  return null;
};
