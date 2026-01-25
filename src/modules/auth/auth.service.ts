import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../../prisma/prisma.service";
import { LoginDto, RegisterDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
        branch: true,
      },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException("Credenciales Incorrectas");
    }

    const permissions = user.roles.flatMap((userRole) =>
      userRole.role.permissions.map((rp) => rp.permission.key),
    );

    const payload = {
      email: user.email,
      sub: user.id,
      permissions: [...new Set(permissions)],
    };

    return {
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        branch: user.branch,
      },
      token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: registerDto.name,
        lastName: registerDto.lastName,
        email: registerDto.email,
        password: hashedPassword,
        branchId: registerDto.branchId,
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    });

    return user;
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        status: true,
        createdAt: true,
        roles: {
          select: {
            role: {
              select: {
                id: true,
                name: true,
                permissions: {
                  select: {
                    permission: {
                      select: {
                        id: true,
                        key: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    // Many roles supported
    const roles = user.roles.map((rol) => ({
      id: rol.role.id,
      name: rol.role.name,
    }));
    // Many permissions by roles not supported yet, only first
    const permissions = user.roles[0].role.permissions.map((permission) => {
      return {
        id: permission.permission.id,
        key: permission.permission.key,
      };
    });
    return { ...user, roles, permissions };
  }
}
