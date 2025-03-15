import { roles } from "../../utils/constant/enum.js";

export const orderEndpoint={
    public:Object.values(roles),
    admin:[roles.ADMIN]
}