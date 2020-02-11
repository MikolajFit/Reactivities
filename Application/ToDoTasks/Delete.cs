using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.ToDoTasks
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var toDoTask = await _context.ToDoTasks.FindAsync(request.Id);

                if (toDoTask == null)
                    throw new Exception("Could not find activity");

                _context.Remove(toDoTask);
                
                var succes = await _context.SaveChangesAsync() > 0;

                if (succes) return Unit.Value;

                throw new Exception("Problem saving changes.");
            }
        }
    }
}