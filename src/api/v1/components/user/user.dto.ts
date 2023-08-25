export interface UserDto {
    id: string;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SignUpDto extends Omit<UserDto, 'id' | 'createdAt' | 'updatedAt'> {}

export interface SignInDto extends Omit<UserDto, 'id' | 'name' | 'createdAt' | 'updatedAt'> {}