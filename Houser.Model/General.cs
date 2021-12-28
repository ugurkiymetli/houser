using System.Collections.Generic;

namespace Emerce_Model
{
    public class General<T>
    {
        public bool IsSuccess { get; set; } = false;
        public T Entity { get; set; }
        public List<T> List { get; set; }
        public int TotalCount { get; set; }
        public List<string> ValidationErrorList { get; set; }
        public string ExceptionMessage { get; set; }
    }
}
