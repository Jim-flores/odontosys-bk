import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';
import { GetClientsQuery } from './dto/client-query.dto';
import { Prisma } from '@prisma/client';

describe('ClientsService', () => {
  let service: ClientsService;
  let prismaService: jest.Mocked<PrismaService>;

  const mockPrismaService = {
    client: {
      create: jest.fn(),
      // findMany: jest.fn(),
      // count: jest.fn(),
      // findUnique: jest.fn(),
      // update: jest.fn(),
      // delete: jest.fn(),
    },
    $transaction: jest.fn(),
  };
  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    prismaService = module.get(PrismaService);

    jest.clearAllMocks();
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  describe('create', () => {
    it('should create a client and return success message', async () => {
      const createClientDto: CreateClientDto = {
        name: 'John',
        lastName: 'Doe',
        phone: '123456789',
        dni: '71221133',
        email: 'john.doe@example.com',
        branchId: 'branch-id',
        status: 'ACTIVE',
        gender: 'MALE',
        userId: 'user-id',
      };

     (prismaService.client.create as jest.Mock).mockResolvedValue({} as any);

      const result = await service.create(createClientDto);

      expect(prismaService.client.create).toHaveBeenCalledWith({
        data: {
          name: createClientDto.name,
          lastName: createClientDto.lastName,
          dni: createClientDto.dni,
          phone: createClientDto.phone,
          email: createClientDto.email,
          branchId: createClientDto.branchId,
          userId: createClientDto.userId,
        },
      });
      expect(result).toBe('Cliente creado exitosamente');
    });
  });

  // describe('findAll', () => {
  //   it('should return paginated clients', async () => {
  //     const query: GetClientsQuery = {
  //       page: 1,
  //       pageSize: 10,
  //       search: 'John',
  //       sortBy: 'name',
  //       status: ['ACTIVE'],
  //       sortOrder: 'asc',
  //     };

  //     const mockRows = [{ id: '1', name: 'John' }];
  //     const mockTotal = 1;

  //     prismaService.$transaction.mockResolvedValue([mockRows, mockTotal]);

  //     const result = await service.findAll(query);

  //     expect(prismaService.$transaction).toHaveBeenCalled();
  //     expect(result).toEqual({
  //       rows: mockRows,
  //       pagination: {
  //         page: 1,
  //         pageSize: 10,
  //         total: 1,
  //         totalPages: 1,
  //       },
  //     });
  //   });
  // });

  // describe('findOne', () => {
  //   it('should return a client if found', async () => {
  //     const id = 'client-id';
  //     const mockClient = { id, name: 'John', branch: {}, user: {} };

  //     (prismaService.client.findUnique as jest.Mock).mockResolvedValue(mockClient as any);

  //     const result = await service.findOne(id);

  //     expect(prismaService.client.findUnique).toHaveBeenCalledWith({
  //       where: { id },
  //       include: {
  //         branch: true,
  //         user: true,
  //       },
  //     });
  //     expect(result).toEqual(mockClient);
  //   });

  //   it('should throw error if client not found', async () => {
  //     const id = 'non-existent-id';

  //     (prismaService.client.findUnique as jest.Mock).mockResolvedValue(null);

  //     await expect(service.findOne(id)).rejects.toThrow();
  //   });
  // });

  // describe('update', () => {
  //   it('should update a client and return success message', async () => {
  //     const id = 'client-id';
  //     const updateClientDto: UpdateClientDto = {
  //       name: 'Updated Name',
  //     };

  //     (prismaService.client.update as jest.Mock).mockResolvedValue({} as any);

  //     const result = await service.update(id, updateClientDto);

  //     expect(prismaService.client.update).toHaveBeenCalledWith({
  //       where: { id },
  //       data: updateClientDto,
  //       include: {
  //         branch: true,
  //         user: true,
  //       },
  //     });
  //     expect(result).toBe('Datos actualizados correctamente');
  //   });

  //   it('should throw error if client not found', async () => {
  //     const id = 'non-existent-id';
  //     const updateClientDto: UpdateClientDto = {};

  //     const error = new Prisma.PrismaClientKnownRequestError('Not found', {
  //       code: 'P2025',
  //       clientVersion: '1.0.0',
  //     });
  //     (prismaService.client.update as jest.Mock).mockRejectedValue(error);

  //     await expect(service.update(id, updateClientDto)).rejects.toThrow();
  //   });
  // });

  // describe('remove', () => {
  //   it('should delete a client and return success message', async () => {
  //     const id = 'client-id';

  //     (prismaService.client.delete as jest.Mock).mockResolvedValue({} as any);

  //     const result = await service.remove(id);

  //     expect(prismaService.client.delete).toHaveBeenCalledWith({
  //       where: { id },
  //     });
  //     expect(result).toBe('Cliente eliminado correctamente');
  //   });
  // });
});