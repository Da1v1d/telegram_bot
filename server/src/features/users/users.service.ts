export class UsersService {
  constructor() {}

  public getUserById = async (id: number) => {
    return {
      id,
      name: "name",
      email: "email",
    };
  };
}
