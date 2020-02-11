using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.ToDoTasks
{
    public class Create
    {
        public class Command : IRequest
        {
            public string Description { get; set; }

            public string Status { get; set; }

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
                var ToDoTask = new ToDoTask()
                {
                    Id = _context.ToDoTasks.Count()+1,
                    Description = request.Description,
                    Status = (Status)(Enum.Parse(typeof(Status), request.Status ?? "0"))
            };

                _context.Add(ToDoTask);
                var succes = await _context.SaveChangesAsync() > 0;
                
                if(succes) return Unit.Value;
                
                throw new Exception("Problem saving changes.");
            }
        }
    }
}