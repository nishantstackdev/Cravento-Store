import { Trash } from 'lucide-react';
import axiosinstance, { notify } from '../../helper/helper';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function DeleteBtn({ id, endpoint }) {
  function deleteHandler() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) Swal.fire({

        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"

      },
        axiosinstance.delete(`http://localhost:7000/${endpoint}/delete/${id}`)
          .then((res) => {
            if (res.data.success) {
              notify(res?.data?.message, true);
              window.location.reload();
            }
          })
          .catch((err) => {
            // console.log(err)
            const message =
              err?.response?.data?.message ||
              err?.message ||
              "Something went wrong";

            notify(message, false);
          })
      );
    });

  }
  return (
    <button
      type="button"
      onClick={deleteHandler}
      className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase text-red-600 hover:text-white bg-red-50 hover:bg-red-600 rounded-xl transition-all active:scale-95 border border-red-100 hover:border-red-600 cursor-pointer"
    >
      {/* Icon component self-closing rahega */}
      <Trash className="w-4 h-4" />
      <span>Delete</span>
    </button>
  )
}