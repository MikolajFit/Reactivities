using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class SeedToDoTasks
    {
        public static void SeedData(DataContext context)
        {
            if (!context.ToDoTasks.Any())
            {
                var toDoTasks = new List<ToDoTask>
                {
                    new ToDoTask()
                    {
                        Description = "Learn C#",
                    },
                    new ToDoTask()
                    {
                        Description = "Learn react",

                    },
                };
                   
                context.ToDoTasks.AddRange(toDoTasks);
                context.SaveChanges();
            }
        }
    }
}