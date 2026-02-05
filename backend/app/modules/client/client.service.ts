import Client from "./client.model.js";
import { CreateClientDTO } from "./dto/createClient.dto.js";
import { UpdateClientDTO } from "./dto/updateClient.dto.js";
import { Types } from "mongoose";

export const createClientService = async (
  userId: Types.ObjectId,
  payload: CreateClientDTO
) => {
  return Client.create({ ...payload, userId });
};

export const getClientsService = async (userId: Types.ObjectId) => {
  return Client.find({ userId });
};

export const updateClientService = async (
  userId: Types.ObjectId,
  clientId: string,
  payload: UpdateClientDTO
) => {
  const client = await Client.findOneAndUpdate(
    { _id: clientId, userId },
    payload,
    { new: true }
  );

  if (!client) throw new Error("Client not found");

  return client;
};

export const deleteClientService = async (
  userId: Types.ObjectId,
  clientId: string
) => {
  const client = await Client.findOneAndDelete({
    _id: clientId,
    userId
  });

  if (!client) throw new Error("Client not found");
};
