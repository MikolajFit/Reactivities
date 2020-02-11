using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.ToDoTasks
{
    public class Details
    {
        public class Query : IRequest<ToDoTask>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ToDoTask>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ToDoTask> Handle(Query request, CancellationToken cancellationToken)
            {
                var toDoTask = await _context.ToDoTasks.FindAsync(request.Id);
                return toDoTask;
            }
        }
    }
}