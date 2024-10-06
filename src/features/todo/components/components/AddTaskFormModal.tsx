import React, { useImperativeHandle } from 'react';
import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import { IPropsAddTaskFormModal, ITodoForm } from '../../config';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryEnum, TodoService } from '../../../../services';
import IReqTask = TodoService.IReqTask;

const AddTaskFormModal: React.FC<IPropsAddTaskFormModal> = ({}, ref) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const defaultValueForm: ITodoForm = {
    taskName: '',
    description: '',
  };

  const queryClient = useQueryClient();
  const addTaskMutation = useMutation({ mutationFn: TodoService.postListTask });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValueForm,
  });
  const onSubmit = (data: ITodoForm) => {
    const reqData: IReqTask = {
      ...data,
      status: false,
    };
    addTaskMutation
      .mutateAsync(reqData)
      .then((res) => {
        console.log('success');
        // @ts-ignore
        queryClient.invalidateQueries({ queryKey: [QueryEnum.GET_LIST_TASK_QUERY] });
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useImperativeHandle(ref, () => {
    return {
      openModal: () => {
        reset();
        onOpen();
      },
      closeModal: () => onClose(),
    };
  }, []);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add New Task</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  control={control}
                  rules={{
                    required: 'Task name is required',
                  }}
                  render={({ field }) => (
                    <div>
                      <Input label="Task name" size="sm" {...field} />
                      <Link color={'danger'}>
                        <ErrorMessage errors={errors} name="taskName" />
                      </Link>
                    </div>
                  )}
                  name={'taskName'}
                />

                <Controller
                  control={control}
                  render={({ field }) => <Textarea label="Description" size="sm" {...field} />}
                  name={'description'}
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button isLoading={addTaskMutation.isPending} color="primary" onPress={() => handleSubmit(onSubmit)()}>
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

// @ts-ignore
export default React.forwardRef(AddTaskFormModal);
