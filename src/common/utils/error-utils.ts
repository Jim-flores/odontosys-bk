import { NotFoundException } from '@nestjs/common';

export function ensureExists<T>(
  resource: T | null | undefined,
  id: string,
  resourceName: string = 'Resource',
): T {
  if (!resource) {
    throw new NotFoundException(`${resourceName} with ID ${id} not found`);
  }
  return resource;
}

export async function findOrThrow<T>(
  promise: Promise<T | null | undefined>,
  id: string,
  resourceName: string = 'Resource',
): Promise<T> {
  const resource = await promise;
  if (!resource) {
    throw new NotFoundException(`${resourceName} with ID ${id} not found`);
  }
  return resource;
}

export function ensureExistsMany<T>(
  resources: T[] | null | undefined,
  count: number,
  resourceName: string = 'Resources',
): T[] {
  if (!resources || resources.length === 0) {
    throw new NotFoundException(`No ${resourceName} found`);
  }
  return resources;
}
