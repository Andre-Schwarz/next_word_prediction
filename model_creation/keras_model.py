import tensorflow as tf


def create_model(total_words, hidden_size, num_steps, optimizer='adam'):
    model = tf.keras.models.Sequential()
    model.add(tf.keras.layers.Embedding(
        total_words, hidden_size, input_length=num_steps))
    model.add(tf.keras.layers.LSTM(units=hidden_size, return_sequences=True))
    model.add(tf.keras.layers.Dense(total_words))
    model.add(tf.keras.layers.Activation('softmax'))
    model.compile(loss='categorical_crossentropy', optimizer=optimizer,
                  metrics=[tf.keras.metrics.categorical_accuracy])
    return model