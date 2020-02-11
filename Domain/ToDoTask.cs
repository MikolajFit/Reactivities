using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public enum Status
    {
        NotDone,
        Done
    }

    public class ToDoTask
    {
        public int Id { get; set; }
        public string Description { get; set; }
      
        public Status Status { get; set; }
    }
}
