import { Request } from 'express';
import { IPaganation } from '../types/paginatio';

interface IPaginationPropsType extends IPaganation {
  response: any;
}

export function ToPagination({
  page,
  size,
  numberOfItems,
  numberOfPages,
  response,
}: IPaginationPropsType) {
  return {
    response,
    pagination: {
      page,
      size,
      numberOfItems,
      numberOfPages,
    },
  };
}

export function PaginationQueryFormat(req: Request) {
  let { page = 1, size = 5 } = req.query;

  if (!Number(page)) {
    page = 1;
  }

  if (!Number(size)) {
    size = 5;
  }

  return { page, size };
}
