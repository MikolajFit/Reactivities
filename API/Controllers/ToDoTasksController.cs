using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ToDoTasksController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ToDoTasksController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<ActionResult<List<ToDoTask>>> List()
        {
            return await _mediator.Send(new Application.ToDoTasks.List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoTask>> Details(int id)
        {
            return await _mediator.Send(new Application.ToDoTasks.Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Application.ToDoTasks.Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]

        public async Task<ActionResult<Unit>> Edit(int id, Application.ToDoTasks.Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await _mediator.Send(new Application.ToDoTasks.Delete.Command{Id=id});
        }
    }
}