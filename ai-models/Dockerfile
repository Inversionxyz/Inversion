FROM tensorflow/serving:latest

COPY ./models /models

ENV MODEL_NAME=prediction_model
ENV MODEL_BASE_PATH=/models

EXPOSE 5000

CMD ["tensorflow_model_server", \
     "--port=5000", \
     "--model_name=${MODEL_NAME}", \
     "--model_base_path=${MODEL_BASE_PATH}/${MODEL_NAME}"] 