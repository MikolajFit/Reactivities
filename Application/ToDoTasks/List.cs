using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ToDoTasks
{
    public class List
    {
        public class Query : IRequest<List<ToDoTask>> { }

        public class Handler : IRequestHandler<Query, List<ToDoTask>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<ToDoTask>> Handle(Query request, CancellationToken cancellationToken)
            {
                var toDoTask = await _context.ToDoTasks.ToListAsync();

                return toDoTask;
            }
        }
    }
}