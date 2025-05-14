export interface UserDto {
  id: number;
  name: string;
  email: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto extends Partial<UserDto> {}
