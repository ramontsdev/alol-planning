import { api } from "./api";

type ErrorAxios = {
  response: { data: any, status: number }
}

type SignInRequest = {
  username: string;
  password: string;
}
type SignInResponse = {
  data: any;
  error?: string;
}

type Method = 'get' | 'post' | 'delete' | 'put'
export async function request(method: Method, path: string, dataRequest?: any): Promise<SignInResponse> {
  try {
    const data = await api[method](path, dataRequest)

    return data
  } catch (err) {
    const errorAxios = err as ErrorAxios

    return errorAxios.response.data
  }
}
class UserService {

  async signIn({ username, password }: SignInRequest): Promise<SignInResponse> {
    return await request('post', '/users/sign-in', { username, password })
  }

}

export const userService = new UserService()
